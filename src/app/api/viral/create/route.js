export async function GET() {
  try {
    return Response.json({
      success: true,
      message: 'Test route working successfully!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Test route failed',
      error: error.message
    }, { status: 500 });
  }
}
