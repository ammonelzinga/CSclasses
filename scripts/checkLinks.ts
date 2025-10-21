/**
 * Link checker script to verify all external links return < 400 status
 */

const links = [
  'https://catalog.byu.edu/programs/34712',
  'https://catalog.byu.edu/departments/1323/courses?query=CS%20111',
  'https://cs.byu.edu/events/hackathon',
  'https://cs.byu.edu/events/ai-seminar',
  'https://cs.byu.edu/scholarships/applications/student/list/',
  'https://cs.byu.edu/scholarships/list'
];

async function checkLink(url: string): Promise<{ url: string; status: number; ok: boolean }> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return { url, status: response.status, ok: response.status < 400 };
  } catch (error) {
    console.error(`Error checking ${url}:`, error);
    return { url, status: -1, ok: false };
  }
}

async function checkAllLinks() {
  console.log('🔍 Checking all external links...\n');

  const results = await Promise.all(links.map(checkLink));

  let allPassed = true;

  results.forEach(result => {
    if (result.ok) {
      console.log(`✅ ${result.url} (${result.status})`);
    } else {
      console.log(`❌ ${result.url} (${result.status})`);
      allPassed = false;
    }
  });

  console.log('\n' + '='.repeat(50));
  if (allPassed) {
    console.log('✅ All links are valid!');
    process.exit(0);
  } else {
    console.log('❌ Some links failed validation');
    process.exit(1);
  }
}

checkAllLinks();
