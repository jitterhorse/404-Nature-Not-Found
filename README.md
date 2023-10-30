# 404 – Nature not found

Built with Nuxt 3 / Vue 3


## Z-Indices
| Level | Usage                                            |
|------:|--------------------------------------------------|
|     0 | Three.js renderer                                |
|     1 | Regular content on top of renderer, e.g. pop-ups |
|    10 | Navigation / Menu                                |
|    20 | Chat backdrop                                    |
|    21 | Chat button                                      |
|    25 | Chat                                             |
|    30 | 404 form, 404 overlay                            |

## Data

The data to automatically populate the chat are stored in `data/material/texts.xlsx` and transformed (see below).
The spreadsheet can include (reference) images and other media files stored in `data/material/../.` by relative path.

Quick responses to user input are stored in `assets/data/responses.json`.

### Custom markdown
```
An example with `yellow` and ~~pink~~ text highlights.
```

### Transforming the data

Run the transformation script:
```shell
cd data
npm run start
```
This generates an output file in `assets/data/chat.json` and copies referenced media files to `public/media/`.

The output and copied media files are not tracked in Git and must be generated locally!