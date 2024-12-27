export async function POST(request) {
  try {
    const { text } = await request.json();
    
    const response = await fetch('http://localhost:5000/generate-sfx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return Response.json(data);
    
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
