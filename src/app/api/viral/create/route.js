export async function POST(request) {
  try {
    const data = await request.json();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success (90% of the time)
    if (Math.random() > 0.1) {
      return Response.json({
        success: true,
        message: 'Project created successfully!',
        data: {
          projectId: 'viral_' + Date.now(),
          ...data
        }
      });
    }
    
    throw new Error('Random failure');
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Failed to create project',
      error: error.message
    }, { status: 500 });
  }
}
