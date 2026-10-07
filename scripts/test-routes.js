import http from 'http';

const urls = [
  '/',
  '/about',
  '/services',
  '/services/ai-cctv-surveillance',
  '/services/face-recognition',
  '/services/ai-integration',
  '/services/computer-vision',
  '/services/web-development',
  '/services/python-projects',
  '/services/final-year-projects',
  '/services/ai-projects',
  '/services/custom-software',
  '/services/student-projects',
  '/projects',
  '/contact',
  '/faq',
  '/order',
  '/sitemap.xml',
  '/robots.txt'
];

async function checkUrl(path) {
  return new Promise((resolve) => {
    http.get({
      host: 'localhost',
      port: 4173,
      path: path
    }, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'] || '',
          hasTitle: body.includes('<title>'),
          title: (body.match(/<title>(.*?)<\/title>/i) || [])[1] || 'None'
        });
      });
    }).on('error', (err) => {
      resolve({
        path,
        error: err.message
      });
    });
  });
}

async function run() {
  console.log('Testing Vite Preview Server Route Availability...');
  let allPassed = true;
  for (const u of urls) {
    const res = await checkUrl(u);
    if (res.statusCode === 200) {
      console.log(`[PASS 200] ${u} -> Title: ${res.title}`);
    } else {
      console.error(`[FAIL] ${u} -> Status: ${res.statusCode} | Error: ${res.error || 'N/A'}`);
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log('\nAll 19 routes verified successfully with HTTP 200 OK!');
  } else {
    console.log('\nSome routes failed verification.');
    process.exit(1);
  }
}

run();
