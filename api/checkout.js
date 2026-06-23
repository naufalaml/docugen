

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderId, grossAmount, email, name } = req.body;
  const serverKey = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-PlW3U6g4UqM2sA2Q5lE8Z9R_'; 
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

  const baseUrl = isProduction 
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

  // Base64 encoding Server Key untuk Basic Auth
  const authHeader = 'Basic ' + Buffer.from(serverKey + ':').toString('base64');

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: orderId,
          gross_amount: parseInt(grossAmount)
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          first_name: name,
          email: email
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error_messages ? data.error_messages.join(', ') : 'Gagal membuat transaksi ke Midtrans');
    }

    return res.status(200).json({ token: data.token, redirect_url: data.redirect_url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
