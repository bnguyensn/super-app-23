const { RESTDataSource } = require('apollo-datasource-rest');

const RED = 'RED';
const GREEN = 'GREEN';
const BLUE = 'BLUE';

const TODOS = {
  '11788a18-0498-4264-8749-79e841e6cf9f': {
    id: '11788a18-0498-4264-8749-79e841e6cf9f',
    createdDate: new Date(1610810515569),
    tags: [],
    content: '',
    done: false,
    color: null,
  },
  '76aa2091-b630-4905-a782-4923d496fe1d': {
    id: '76aa2091-b630-4905-a782-4923d496fe1d',
    createdDate: new Date(1610810678947),
    tags: ['work'],
    content: '',
    done: false,
    color: BLUE,
  },
};

class ColorAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.noopschallenge.com/hexbot';
  }

  async getColor() {
    return this.get('');
  }
}

module.exports = {
  RED,
  GREEN,
  BLUE,
  TODOS,
  ColorAPI,
};
