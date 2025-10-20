@ReactMethod
public void startPayment(String payloadJson, Promise promise) {
    JSONObject payload = new JSONObject(payloadJson);
    Intent intent = new Intent(getCurrentActivity(), CCAvenuePaymentActivity.class);
    intent.putExtra("access_code", payload.getString("access_code"));
    intent.putExtra("merchant_id", payload.getString("merchant_id"));
    intent.putExtra("order_id", payload.getString("order_id"));
    intent.putExtra("currency", payload.getString("currency"));
    intent.putExtra("amount", payload.getString("amount"));
    intent.putExtra("redirect_url", payload.getString("redirect_url"));
    intent.putExtra("cancel_url", payload.getString("cancel_url"));
    intent.putExtra("rsa_key", payload.getString("requestHash"));
    reactContext.startActivity(intent);
    promise.resolve("Payment Started");
}
