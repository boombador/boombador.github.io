date="$(date +%F)"
timestamp="$(date +%Y-%m-%dT%H:%M:%S%z)"
echo -n "Enter post title: "
read title

header="---
date: $timestamp
title: $title
---" 

slug="$(echo $title | tr --squeeze-repeats ' ' '-' | tr [:upper:] [:lower:])"
filename="_drafts/$date-$slug.md"

echo "$header" >> $filename
vim $filename
