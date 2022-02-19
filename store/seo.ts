import { FetchReturn } from '@nuxt/content/types/query-builder';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState } from "."

export type Article = {
  title: string;
  description: string;
  slug: string;
  image: string;
  createdAt: string;
  tags: string[];
}

export type SeoState = {
  article?: Article;
}

export const state = (): SeoState => ({
  article: {
    title: '',
    description: '',
    slug: '',
    image: '',
    createdAt: '',
    tags: []
  }
})

export const getters: GetterTree<SeoState, RootState> = {
  article: (state: SeoState) => state.article
}

export const mutations: MutationTree<SeoState> = {
  setArticle(state: SeoState, article: Article) {
    state.article = article
  }
}

export const actions: ActionTree<SeoState, RootState> = {
  async fetchArticle({ commit }, slug: string) {
    const [ article ] = await this.$content('blog', this.$i18n.locale)
      .where({ slug })
      .fetch() as FetchReturn[];

    commit('setArticle', article);
  }
}
