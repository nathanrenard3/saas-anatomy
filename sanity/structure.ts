import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Articles (FR)')
        .schemaType('post')
        .child(
          S.documentList()
            .title('Articles Français')
            .filter('_type == "post" && language == "fr"')
        ),
      S.listItem()
        .title('Articles (EN)')
        .schemaType('post')
        .child(
          S.documentList()
            .title('English Articles')
            .filter('_type == "post" && language == "en"')
        ),
      S.listItem()
        .title('All Articles')
        .schemaType('post')
        .child(S.documentTypeList('post').title('All Articles')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['post'].includes(listItem.getId()!)
      ),
    ])
