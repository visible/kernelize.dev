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

ai_hash=$(clone "vercel/ai" "content" "ai")
hono_hash=$(clone "honojs/website" "docs" "hono")
svelte_hash=$(clone "sveltejs/svelte.dev" "apps/svelte.dev/content" "svelte")
effect_hash=$(clone "Effect-TS/website" "content/src/content/docs" "effect")
workflow_hash=$(clone "vercel/workflow" "docs/content" "workflow")
octokit_hash=$(clone "octokit/rest.js" "docs/src/pages/api" "octokit")

cat > public/hashes.json << EOF
{
  "ai": "$ai_hash",
  "hono": "$hono_hash",
  "svelte": "$svelte_hash",
  "effect": "$effect_hash",
  "workflow": "$workflow_hash",
  "octokit": "$octokit_hash"
}
EOF

echo "done"
