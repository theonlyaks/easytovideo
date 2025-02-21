const DEMO_VIDEOS = {
  before: '/videos/input_demo.mp4', // Update with actual demo video paths
  after: '/videos/output_demo.mp4'
};

export function Demo() {
    return (
        <div className="w-full max-w-4xl mx-auto my-8">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
            See the Difference
          </h2>
          
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            <div className="relative rounded-lg overflow-hidden bg-black/5 flex justify-center">
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-sm rounded">
                Before
              </div>
              <video
                src={DEMO_VIDEOS.before}
                loop
                controls={false}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative rounded-lg overflow-hidden bg-black/5 flex justify-center">
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-sm rounded">
                After
              </div>
              <video
                src={DEMO_VIDEOS.after}
                loop
                controls={false}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      );
    
}
