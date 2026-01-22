#!/bin/bash
set -e

rm -rf content
mkdir -p content

clone() {
  local repo=$1
  local folder=$2
  local target=$3

  git clone --depth 1 --filter=blob:none --sparse "https://github.com/$repo.git" "temp-$target"
  cd "temp-$target"
  git sparse-checkout set "$folder"
  cd ..
  mv "temp-$target/$folder" "content/$target"
  rm -rf "temp-$target"
}

clone "vercel/ai" "content" "ai"
clone "honojs/website" "docs" "hono"
clone "sveltejs/svelte.dev" "apps/svelte.dev/content" "svelte"
clone "Effect-TS/website" "content/src/content/docs" "effect"

echo "done"
