#!/bin/bash
set -e

rm -rf content
mkdir -p content

ai_hash=""
hono_hash=""
svelte_hash=""
effect_hash=""
workflow_hash=""
octokit_hash=""
turborepo_hash=""
nextjs_hash=""
tauri_hash=""
reactnative_hash=""
expo_hash=""

clone() {
  local repo=$1
  local folder=$2
  local target=$3

  git clone --depth 1 --filter=blob:none --sparse "https://github.com/$repo.git" "temp-$target" >&2
  cd "temp-$target"
  git sparse-checkout set "$folder" >&2
  local hash=$(git rev-parse HEAD)
  cd ..
  mv "temp-$target/$folder" "content/$target"
  rm -rf "temp-$target"
  echo "$hash"
}

cloneoctokit() {
  mkdir -p content/octokit
  curl -sL "https://raw.githubusercontent.com/octokit/octokit.js/HEAD/README.md" > "content/octokit/overview.md"
  curl -sL "https://raw.githubusercontent.com/octokit/rest.js/HEAD/README.md" > "content/octokit/rest-client.md"
  curl -sL "https://raw.githubusercontent.com/octokit/graphql.js/HEAD/README.md" > "content/octokit/graphql-client.md"
  curl -sL "https://raw.githubusercontent.com/octokit/core.js/HEAD/README.md" > "content/octokit/core.md"
  curl -sL "https://raw.githubusercontent.com/octokit/request.js/HEAD/README.md" > "content/octokit/requests.md"
  curl -sL "https://raw.githubusercontent.com/octokit/auth-app.js/HEAD/README.md" > "content/octokit/auth-github-apps.md"
  curl -sL "https://raw.githubusercontent.com/octokit/auth-token.js/HEAD/README.md" > "content/octokit/auth-tokens.md"
  curl -sL "https://raw.githubusercontent.com/octokit/auth-oauth-app.js/HEAD/README.md" > "content/octokit/auth-oauth.md"
  curl -sL "https://raw.githubusercontent.com/octokit/action.js/HEAD/README.md" > "content/octokit/github-actions.md"
  curl -sL "https://raw.githubusercontent.com/octokit/app.js/HEAD/README.md" > "content/octokit/apps.md"
  curl -sL "https://raw.githubusercontent.com/octokit/webhooks.js/HEAD/README.md" > "content/octokit/webhooks.md"
  curl -sL "https://raw.githubusercontent.com/octokit/oauth-app.js/HEAD/README.md" > "content/octokit/oauth.md"
  curl -sL "https://raw.githubusercontent.com/octokit/plugin-throttling.js/HEAD/README.md" > "content/octokit/throttling.md"
  curl -sL "https://raw.githubusercontent.com/octokit/plugin-retry.js/HEAD/README.md" > "content/octokit/retry.md"
  curl -sL "https://raw.githubusercontent.com/octokit/plugin-paginate-rest.js/HEAD/README.md" > "content/octokit/pagination.md"
  local hash=$(curl -s "https://api.github.com/repos/octokit/octokit.js/commits?per_page=1" | grep -o '"sha": "[^"]*"' | head -1 | cut -d'"' -f4)
  echo "$hash"
}

ai_hash=$(clone "vercel/ai" "content" "ai")
hono_hash=$(clone "honojs/website" "docs" "hono")
svelte_hash=$(clone "sveltejs/svelte.dev" "apps/svelte.dev/content" "svelte")
effect_hash=$(clone "Effect-TS/website" "content/src/content/docs" "effect")
workflow_hash=$(clone "vercel/workflow" "docs/content" "workflow")
octokit_hash=$(cloneoctokit)
turborepo_hash=$(clone "vercel/turborepo" "docs/site/content/docs" "turborepo")
find content/turborepo -name "*.tsx" -o -name "*.ts" -o -name "*.json" | xargs rm -f 2>/dev/null || true
nextjs_hash=$(clone "vercel/next.js" "docs" "nextjs")
find content/nextjs -name "*.tsx" -o -name "*.ts" -o -name "*.json" | xargs rm -f 2>/dev/null || true
tauri_hash=$(clone "tauri-apps/tauri-docs" "src/content/docs" "tauri")
rm -rf content/tauri/es content/tauri/fr content/tauri/it content/tauri/ja content/tauri/ko content/tauri/zh-cn content/tauri/_it content/tauri/_fragments 2>/dev/null || true
find content/tauri -name "*.tsx" -o -name "*.ts" -o -name "*.json" | xargs rm -f 2>/dev/null || true
reactnative_hash=$(clone "facebook/react-native-website" "docs" "reactnative")
find content/reactnative -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.json" | xargs rm -f 2>/dev/null || true
expo_hash=$(clone "expo/expo" "docs/pages" "expo")
rm -rf content/expo/api 2>/dev/null || true
find content/expo -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.json" | xargs rm -f 2>/dev/null || true

cat > public/hashes.json << EOF
{
  "ai": "$ai_hash",
  "hono": "$hono_hash",
  "svelte": "$svelte_hash",
  "effect": "$effect_hash",
  "workflow": "$workflow_hash",
  "octokit": "$octokit_hash",
  "turborepo": "$turborepo_hash",
  "nextjs": "$nextjs_hash",
  "tauri": "$tauri_hash",
  "reactnative": "$reactnative_hash",
  "expo": "$expo_hash"
}
EOF

echo "done"
