export class AdzBook {
    constructor(
        public title: string,
        public authors: string[],
        public pageCount: number,
        public publishedDate: number,
        public language: string,
        public categories: string[],
        public imageLinks: {
            thumbnail: string, smallThumbnail: string
        }

        /*      private category: string,
              private publisher: string,
      
              private maturityRating: string,
              private isEbook: boolean,
              private accessInfo: {
                    epub: { isAvailable: boolean, link: string},
                    pdf: { isAvailable: boolean, link: string}
          },
       */
    ) { }
}
