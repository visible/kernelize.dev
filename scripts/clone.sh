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

clonereadme() {
  local repo=$1
  local name=$2
  local target=$3

  curl -sL "https://raw.githubusercontent.com/$repo/HEAD/README.md" > "content/$target/$name.md"
}

cloneoctokit() {
  mkdir -p content/octokit
  local repos="octokit/octokit.js octokit/rest.js octokit/graphql.js octokit/core.js octokit/auth-app.js octokit/auth-token.js octokit/auth-oauth-app.js octokit/action.js octokit/app.js octokit/webhooks.js octokit/oauth-app.js octokit/plugin-throttling.js octokit/plugin-retry.js octokit/plugin-paginate-rest.js octokit/request.js"
  for repo in $repos; do
    local name=$(echo "$repo" | cut -d'/' -f2 | sed 's/\.js$//')
    clonereadme "$repo" "$name" "octokit"
  done
  local hash=$(curl -s "https://api.github.com/repos/octokit/octokit.js/commits?per_page=1" | grep -o '"sha": "[^"]*"' | head -1 | cut -d'"' -f4)
  echo "$hash"
}

ai_hash=$(clone "vercel/ai" "content" "ai")
hono_hash=$(clone "honojs/website" "docs" "hono")
svelte_hash=$(clone "sveltejs/svelte.dev" "apps/svelte.dev/content" "svelte")
effect_hash=$(clone "Effect-TS/website" "content/src/content/docs" "effect")
workflow_hash=$(clone "vercel/workflow" "docs/content" "workflow")
octokit_hash=$(cloneoctokit)

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
