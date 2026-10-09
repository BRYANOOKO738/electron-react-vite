<script setup>
import { computed, onMounted, ref } from 'vue';

// Lists the installers of the latest published GitHub release and highlights
// the one for the visitor's operating system.
const REPO = 'BRYANOOKO738/electron-react-vite';
const RELEASES_URL = `https://github.com/${REPO}/releases`;

const PLATFORMS = [
  {
    id: 'windows',
    label: 'Windows',
    detail: 'Windows 10 or 11, 64-bit',
    matches: (name) => name.endsWith('.exe'),
  },
  {
    id: 'mac-arm',
    label: 'macOS · Apple Silicon',
    detail: 'Macs with M1, M2, M3 or newer',
    matches: (name) => /darwin-arm64.*\.zip$/.test(name),
  },
  {
    id: 'mac-intel',
    label: 'macOS · Intel',
    detail: 'Older Macs with an Intel processor',
    matches: (name) => /darwin-x64.*\.zip$/.test(name),
  },
  {
    id: 'deb',
    label: 'Linux · .deb',
    detail: 'Ubuntu, Debian, Linux Mint',
    matches: (name) => name.endsWith('.deb'),
  },
  {
    id: 'rpm',
    label: 'Linux · .rpm',
    detail: 'Fedora, RHEL, openSUSE',
    matches: (name) => name.endsWith('.rpm'),
  },
];

const status = ref('loading'); // 'loading' | 'ready' | 'none' | 'error'
const release = ref(null);
const recommendedId = ref('');

const downloads = computed(() =>
  PLATFORMS.map((platform) => ({
    ...platform,
    asset: release.value?.assets.find((asset) => platform.matches(asset.name)),
  })).filter((platform) => platform.asset),
);

const detectPlatform = () => {
  const platform = (navigator.userAgentData?.platform || navigator.userAgent).toLowerCase();
  if (platform.includes('win')) return 'windows';
  if (platform.includes('mac')) return 'mac-arm';
  if (platform.includes('linux')) return 'deb';
  return '';
};

const formatSize = (bytes) => `${(bytes / 1024 / 1024).toFixed(0)} MB`;
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' });

onMounted(async () => {
  recommendedId.value = detectPlatform();
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (response.status === 404) {
      status.value = 'none';
      return;
    }
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    release.value = await response.json();
    status.value = downloads.value.length > 0 ? 'ready' : 'none';
  } catch (error) {
    console.error('Could not load the latest release:', error);
    status.value = 'error';
  }
});
</script>

<template>
  <div class="downloads">
    <p v-if="status === 'loading'" class="message">Looking for the latest release…</p>

    <div v-else-if="status === 'none'" class="message">
      <p><strong>No release has been published yet.</strong></p>
      <p>
        Installers appear here as soon as the first version is released. Until then, start from the
        source code below.
      </p>
    </div>

    <div v-else-if="status === 'error'" class="message">
      <p>The release list could not be loaded right now.</p>
      <p>
        Open the <a :href="RELEASES_URL" target="_blank" rel="noreferrer">releases page</a> to
        download the installers directly.
      </p>
    </div>

    <template v-else>
      <p class="version">
        Version <strong>{{ release.tag_name }}</strong> · released
        {{ formatDate(release.published_at) }} ·
        <a :href="release.html_url" target="_blank" rel="noreferrer">release notes</a>
      </p>
      <div class="grid">
        <a
          v-for="item in downloads"
          :key="item.id"
          :href="item.asset.browser_download_url"
          :class="['card', { recommended: item.id === recommendedId }]"
        >
          <span v-if="item.id === recommendedId" class="badge">For your computer</span>
          <span class="label">{{ item.label }}</span>
          <span class="detail">{{ item.detail }}</span>
          <span class="size">Download · {{ formatSize(item.asset.size) }}</span>
        </a>
      </div>
    </template>
  </div>
</template>

<style scoped>
.downloads {
  margin: 24px 0;
}
.message {
  padding: 16px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.message p {
  margin: 4px 0;
}
.version {
  color: var(--vp-c-text-2);
  font-size: 14px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.2s;
}
.card:hover {
  border-color: var(--vp-c-brand-1);
}
.card.recommended {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}
.badge {
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
}
.label {
  font-weight: 600;
}
.detail {
  color: var(--vp-c-text-2);
  font-size: 14px;
}
.size {
  margin-top: 8px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 500;
}
</style>
