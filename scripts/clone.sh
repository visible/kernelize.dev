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
betterauth_hash=""
swift_hash=""
openai_hash=""
anthropic_hash=""
together_hash=""
fireworks_hash=""
groq_hash=""
cerebras_hash=""
fal_hash=""
replicate_hash=""
mistral_hash=""
cohere_hash=""
elevenlabs_hash=""
perplexity_hash=""
xai_hash=""

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

cloneopenai() {
  mkdir -p content/openai
  curl -sL "https://platform.openai.com/docs/llms-full.txt" > "content/openai/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

cloneanthropic() {
  mkdir -p content/anthropic
  curl -sL "https://docs.anthropic.com/llms-full.txt" > "content/anthropic/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

clonetogether() {
  mkdir -p content/together
  curl -sL "https://docs.together.ai/llms-full.txt" > "content/together/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

clonefireworks() {
  mkdir -p content/fireworks
  curl -sL "https://docs.fireworks.ai/llms-full.txt" > "content/fireworks/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

clonegroq() {
  mkdir -p content/groq
  curl -sL "https://console.groq.com/docs/llms-full.txt" > "content/groq/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

clonecerebras() {
  mkdir -p content/cerebras
  curl -sL "https://inference-docs.cerebras.ai/llms-full.txt" > "content/cerebras/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

clonefal() {
  mkdir -p content/fal
  curl -sL "https://docs.fal.ai/llms-full.txt" > "content/fal/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

clonereplicate() {
  mkdir -p content/replicate
  curl -sL "https://replicate.com/docs/llms.txt" > "content/replicate/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

cloneelevenlabs() {
  mkdir -p content/elevenlabs
  curl -sL "https://elevenlabs.io/docs/llms-full.txt" > "content/elevenlabs/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

cloneperplexity() {
  mkdir -p content/perplexity
  curl -sL "https://docs.perplexity.ai/llms-full.txt" > "content/perplexity/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

clonemistral() {
  mkdir -p content/mistral
  curl -sL "https://docs.mistral.ai/llms-full.txt" > "content/mistral/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

clonecohere() {
  mkdir -p content/cohere
  curl -sL "https://docs.cohere.com/llms-full.txt" > "content/cohere/docs.md"
  local hash=$(date +%Y%m%d)
  echo "$hash"
}

clonexai() {
  mkdir -p content/xai
  curl -sL "https://docs.x.ai/llms.txt" > "content/xai/docs.md"
  local hash=$(date +%Y%m%d)
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
betterauth_hash=$(clone "better-auth/better-auth" "docs/content/docs" "betterauth")
find content/betterauth -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.json" | xargs rm -f 2>/dev/null || true
swift_hash=$(clone "swiftlang/swift-org-website" "documentation" "swift")
openai_hash=$(cloneopenai)
anthropic_hash=$(cloneanthropic)
together_hash=$(clonetogether)
fireworks_hash=$(clonefireworks)
groq_hash=$(clonegroq)
cerebras_hash=$(clonecerebras)
fal_hash=$(clonefal)
replicate_hash=$(clonereplicate)
mistral_hash=$(clonemistral)
cohere_hash=$(clonecohere)
elevenlabs_hash=$(cloneelevenlabs)
perplexity_hash=$(cloneperplexity)
xai_hash=$(clonexai)

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
  "expo": "$expo_hash",
  "betterauth": "$betterauth_hash",
  "swift": "$swift_hash",
  "openai": "$openai_hash",
  "anthropic": "$anthropic_hash",
  "together": "$together_hash",
  "fireworks": "$fireworks_hash",
  "groq": "$groq_hash",
  "cerebras": "$cerebras_hash",
  "fal": "$fal_hash",
  "replicate": "$replicate_hash",
  "mistral": "$mistral_hash",
  "cohere": "$cohere_hash",
  "elevenlabs": "$elevenlabs_hash",
  "perplexity": "$perplexity_hash",
  "xai": "$xai_hash"
}
EOF

echo "done"
