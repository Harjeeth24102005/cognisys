export const BLOG_POSTS = [
  {
    id: 1,
    title: "Architecting Autonomous AI CCTV Systems with Low Latency Vision Pipelines",
    slug: "architecting-autonomous-ai-cctv-systems",
    summary: "How modern computer vision architectures combine edge inference, dynamic region-of-interest scanning, and cloud intelligence to deliver real-time surveillance at scale.",
    content: `Surveillance infrastructure is undergoing a seismic shift. Traditional passive CCTV setups that merely record footage for forensic review are being rapidly replaced by intelligent, proactive edge-vision systems that detect, track, and alert before security incidents escalate.

### The Problem with Cloud-Only Inference
Transmitting continuous high-definition video streams (1080p or 4K at 30fps) from dozens of cameras to cloud servers consumes massive bandwidth, introduces 500ms+ network latencies, and creates significant recurring infrastructure costs.

### The Cognisys Hybrid Edge Architecture
At Cognisys, we deploy an optimized edge gateway adjacent to camera clusters. The architecture consists of:
1. **Hardware-Accelerated Decoding**: Direct RTSP stream ingestion via NVIDIA DeepStream and FFmpeg hardware decoders.
2. **YOLOv11 TensorRT Optimization**: Quantized FP16/INT8 inference delivering object detection in under 12 milliseconds.
3. **ByteTrack Multi-Object Association**: Persistent tracking IDs that survive camera occlusions.
4. **Cloud Event Sync**: Only structured metadata, keyframe embeddings, and anomalous security events are sent to the cloud dashboard.

This hybrid approach slashes bandwidth requirements by up to 90% while guaranteeing sub-50ms local alert trigger times.`,
    category: "Computer Vision",
    author_name: "Cognisys Research Team",
    image_url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
    read_time: "6 min read",
    published_at: "2026-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Building Ultra-Fast Modern Web Applications with React & Modern Frameworks",
    slug: "building-fast-modern-web-applications",
    summary: "A practical guide to rendering high-performance websites without sacrificing mobile responsiveness or Lighthouse performance scores.",
    content: `Modern web development has transitioned to an indispensable standard for modern technology companies. However, poor optimization can quickly ruin user experience.

### Key Optimization Strategies
- **Component Splitting & Lazy Loading**: Instead of loading megabyte-heavy bundles upfront, code splitting allows fast initial paint and smooth transitions.
- **Adaptive Pixel Ratio & Frame Optimization**: Dynamically adjust assets and animations based on device capabilities (1.0 for high-DPI mobile, 1.5-2.0 for desktop).
- **Graceful Fallback Handling**: Always provide responsive, lightweight fallback layers when context creation fails or reduced motion preferences are detected.

Cognisys implements these principles to deliver seamless 60FPS digital journeys across all screen sizes.`,
    category: "Web Engineering",
    author_name: "Cognisys Frontend Lab",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    read_time: "5 min read",
    published_at: "2026-03-20T14:30:00Z"
  },
  {
    id: 3,
    title: "The Student Engineer's Blueprint: From Capstone Idea to Working Prototype",
    slug: "student-engineers-blueprint-capstone-prototype",
    summary: "Proven methodologies for computer science and engineering students to design, architect, and successfully present high-impact final year projects.",
    content: `Every great project begins with a clear problem definition. When starting a final year engineering project, many students get overwhelmed by choosing overly complex frameworks without a solid architectural foundation.

### The 5-Stage Engineering Pipeline
1. **Problem Scoping**: Define a realistic, measurable problem statement with clear constraints.
2. **Modular Architecture**: Separate data ingestion, business logic, ML inference, and user presentation.
3. **Reproducible Environment**: Containerize dependencies with Docker or clean virtual environments.
4. **Rigorous Testing & Metrics**: Benchmark performance against standard datasets and compute quantifiable accuracy metrics.
5. **Clear Documentation & Viva Preparation**: Maintain architectural diagrams, API schemas, and interactive live demos.

Cognisys Student Technical Solutions provides hands-on mentorship across this entire journey.`,
    category: "Student Innovation",
    author_name: "Cognisys Academic Division",
    image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    read_time: "4 min read",
    published_at: "2026-03-25T09:15:00Z"
  }
];

export const getBlogPostBySlug = (slug) => {
  return BLOG_POSTS.find(post => post.slug === slug);
};
