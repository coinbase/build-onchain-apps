This folder contains cli code for `build-onchain-apps`

## How to add a new experience option

- update `create/experiences.ts`. `value` is the folder name i.e. `app/${folder-name}`

## How to modify blank app

We eject a blank page.tsx file to `template/web/app/pages`. `create/setupProject.ts` → `setupBlankApp` function contains the blank page file.
