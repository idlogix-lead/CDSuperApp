package com.idlogixtech.citidev

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.*
import com.ccavenue.dubaisdk.externalModel.MerchantDetails
import com.ccavenue.dubaisdk.externalModel.BillingAddress
import com.ccavenue.dubaisdk.externalModel.ShippingAddress
import com.ccavenue.dubaisdk.externalModel.StandardInstructions
import com.ccavenue.dubaisdk.CCAvenuePaymentOptions
import com.ccavenue.dubaisdk.externalModel.AvenuesTransactionCallBack
import java.util.*

class CCAvenueModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext),
    AvenuesTransactionCallBack.stateListener {

    companion object {
        lateinit var promise: Promise
    }

    override fun getName(): String = "CCAvenueModule"

    @ReactMethod
    fun payCCAvenue(options: ReadableMap, promise: Promise) {
        CCAvenueModule.promise = promise
        AvenuesTransactionCallBack.getInstance().setListener(this)

        // ---- Merchant Details ----
        val m = MerchantDetails().apply {
            accessCode = options.getString("accessCode") ?: "TESTACCESSCODE123"
            merchantId = options.getString("mId") ?: "65770"
            currency = options.getString("currency") ?: "AED"
            amount = options.getString("amount") ?: "1.00"

            // Must be valid HTTPS URL
            redirectUrl = options.getString("redirect_url") ?: "https://infinitycitidev.duckdns.org/api/v1/processes/ccredirect"
            setCancel_url(options.getString("cancel_url") ?: "https://infinitycitidev.duckdns.org/api/v1/processes/cccancel")

            orderId = options.getString("order_id") ?: UUID.randomUUID().toString()
            customerId = options.getString("customer_id") ?: "CUST123"
            trackingId = options.getString("tracking_id") ?: "TRK123"
            requestHash = options.getString("request_hash") ?: ""

            isShowAddr = true
            isCCAvenuePromo = true
            promoCode = options.getString("promo") ?: ""
            add1 = options.getString("merchantParam1") ?: ""
            add2 = options.getString("merchantParam2") ?: ""
            add3 = options.getString("merchantParam3") ?: ""
            add4 = options.getString("merchantParam4") ?: ""
            add5 = options.getString("merchantParam5") ?: ""
            env_type = "TEST" // Change to "PROD" in production
        }

        // ---- Billing Address ----
        val b = BillingAddress().apply {
            name = options.getString("billing_name") ?: "John Doe"
            address = options.getString("billing_address") ?: "123 Street"
            country = options.getString("billing_country") ?: "India"
            state = options.getString("billing_state") ?: "Maharashtra"
            city = options.getString("billing_city") ?: "Mumbai"
            telephone = options.getString("billing_telephone") ?: "9999999999"
            email = options.getString("billing_email") ?: "john@example.com"
        }

        // ---- Shipping Address ----
        val s = ShippingAddress().apply {
            name = options.getString("shipping_name") ?: "John Doe"
            address = options.getString("shipping_address") ?: "123 Street"
            country = options.getString("shipping_country") ?: "India"
            state = options.getString("shipping_state") ?: "Maharashtra"
            city = options.getString("shipping_city") ?: "Mumbai"
            telephone = options.getString("shipping_telephone") ?: "9999999999"
        }

        // ---- Standard Instructions ----
        val si = StandardInstructions().apply {
            si_type = options.getString("siType")
            si_mer_ref_no = options.getString("siRef")
            si_is_setup_amt = options.getString("siSetupAmount")
            si_amount = options.getString("siAmount")
            si_start_date = options.getString("siStartDate")
            si_frequency_type = options.getString("siFreqType")
            si_frequency = options.getString("siFreq")
            si_bill_cycle = options.getString("siBillCycle")
        }

        // ---- Start Payment Activity ----
        try {
            val intent = Intent(reactContext, CCAvenuePaymentOptions::class.java).apply {
                putExtra("merchant", m)
                putExtra("billing", b)
                putExtra("shipping", s)
                putExtra("standard_instructions", si) // no spaces
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            reactContext.startActivity(intent)
        } catch (e: Exception) {
            promise.reject("CCAvenueError", e.message)
        }
    }

    // ---- Callbacks ----
    override fun onSuccess(response: String) {
        promise.resolve(response)
    }

    override fun onError(error: String) {
        promise.reject("CCAvenueError", error)
    }

    override fun onCancel(error: String) {
        val map = Arguments.createMap()
        map.putString("status", "cancelled")
        promise.resolve(map)
    }
}
