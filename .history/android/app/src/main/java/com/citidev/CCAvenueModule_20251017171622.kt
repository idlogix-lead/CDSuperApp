package com.idlogixtech.citidev

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.*
import com.ccavenue.dubaisdk.MerchantDetails
import com.ccavenue.dubaisdk.BillingAddress
import com.ccavenue.dubaisdk.ShippingAddress
import com.ccavenue.dubaisdk.StandardInstructions
import com.ccavenue.dubaisdk.CCAvenuePaymentOptions
import com.sdk.avenueslib.* // adjust this import to match the actual SDK package
// import com.ccavenue.dubaisdk.AvenuesTransactionCallBack

class CCAvenueModule(private val reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext), AvenuesTransactionCallBack {

    companion object {
        lateinit var promise: Promise
    }

    override fun getName(): String {
        return "CCAvenueModule"
    }

    @ReactMethod
    fun payCCAvenue(options: ReadableMap, promise: Promise) {
        CCAvenueModule.promise = promise
        AvenuesTransactionCallBack.getInstance().setListener(this)

        val m = MerchantDetails().apply {
            accessCode = options.getString("accessCode")
            merchantId = options.getString("mId")
            currency = options.getString("currency")
            amount = options.getString("amount")
            redirectUrl = options.getString("redirect_url")
            setCancel_url(options.getString("cancel_url"))
            orderId = options.getString("order_id")
            customerId = options.getString("customer_id")
            trackingId = options.getString("tracking_id")
            requestHash = options.getString("request_hash")
            isShowAddr = true
            isCCAvenuePromo = true
            promoCode = options.getString("promo")
            add1 = options.getString("merchantParam1")
            add2 = options.getString("merchantParam2")
            add3 = options.getString("merchantParam3")
            add4 = options.getString("merchantParam4")
            add5 = options.getString("merchantParam5")
            env_type = "TEST" // change to "PROD" in production
        }

        val b = BillingAddress().apply {
            name = options.getString("billing_name")
            address = options.getString("billing_address")
            country = options.getString("billing_country")
            state = options.getString("billing_state")
            city = options.getString("billing_city")
            telephone = options.getString("billing_telephone")
            email = options.getString("billing_email")
        }

        val s = ShippingAddress().apply {
            name = options.getString("shipping_name")
            address = options.getString("shipping_address")
            country = options.getString("shipping_country")
            state = options.getString("shipping_state")
            city = options.getString("shipping_city")
            telephone = options.getString("shipping_telephone")
        }

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

        val i = Intent(reactContext, CCAvenuePaymentOptions::class.java)
        i.putExtra("merchant", m)
        i.putExtra("billing", b)
        i.putExtra("shipping", s)
        i.putExtra("standard instructions", si)
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

        reactContext.startActivity(i)
    }

    // ---- Callback Methods ----
   /* override fun onSuccess(response: String) {
        promise.resolve(response)
    }

    override fun onError(error: String) {
        promise.reject("CCAvenueError", error)
    }

    override fun onCancel() {
        val map = Arguments.createMap()
        map.putString("status", "cancelled")
        promise.resolve(map)
    }
    */
}
