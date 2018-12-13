import Vuex from 'vuex';

let version = 'draft';

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: '',
      debug: '',
      language: 'de',
      sidebar: null,
      settings: {
        main_navi: []
      }
    },
    mutations: {
      setSettings (state, settings) {
        state.settings = settings;
      },
      setLanguage (state, language) {
        state.language = language;
      },
      setCacheVersion (state, version) {
        state.cacheVersion = version;
      }
    },
    actions: {
      setSidebar({state}, value) {
        state.sidebar = value;
      },
      loadFullPage ({state}, path) {
        return this.$storyapi.get(`cdn/stories${path}`, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data;
        })
      },
      loadPage ({state}, path) {
        if (!path) {
          path = '/';
        }

        return this.$storyapi.get(`cdn/stories/${state.language}${path}`, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data;
        })
      },
      loadWorkshopItem ({state}, slug) {
        let endpoint = `cdn/stories/${state.language}/workshops/${slug}`;
        return this.$storyapi.get(endpoint, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      findWorkshops ({state}, filters) {
        return this.$storyapi.get('cdn/stories', {
          filter_query: filters.filter_query,
          search_term: filters.search_term,
          version: version,
          cv: state.cacheVersion,
        }).then((res) => {
          return res.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      loadNewsItem ({state}, slug) {
        let endpoint = `cdn/stories/${state.language}/news/${slug}`;
        return this.$storyapi.get(endpoint, {
          version: version,
          cv: state.cacheVersion
        }).then((res) => {
          return res.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      findNews ({state}, filters) {
        //console.log(filters);
        return this.$storyapi.get('cdn/stories', {
          filter_query: filters.filter_query,
          version: version,
          cv: state.cacheVersion,
          starts_with: `${state.language}/news`,
        }).then((res) => {
          return res.data;
        }).catch((res) => {
          console.log(res);
        });
      },
      loadSitemap ({ state, commit }) {
        return this.$storyapi.get('cdn/links', {
          version: version,
          cv: state.cacheVersion,
          starts_with: state.language,
        }).then((res) => {
          return res.data
        }).catch((res) => {
          console.log(res);
        })
      },
      loadSettings ({ state, commit }, context) {
        return this.$storyapi.get(`cdn/stories/${context.language}/settings`, {
          version: version,
        }).then((res) => {
          commit('setSettings', res.data.story.content)
        }).catch((e) => {
          console.log(e);
        });
      },
      createMember ({ state, commit }, context) {
        console.log(context);
      }
    }
  })
}

export default createStore
