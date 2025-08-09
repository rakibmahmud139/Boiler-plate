import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  modelQuery: Query<T[], T>;
  query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter() {
    const queryObj = { ...this.query };

    const { minPrice, maxPrice, ...otherFilters } = queryObj;

    if (minPrice !== undefined && maxPrice !== undefined) {
      this.modelQuery = this.modelQuery.find({
        productPrice: { $gte: minPrice, $lte: maxPrice },
      });
    }

    this.modelQuery = this.modelQuery.find(otherFilters as FilterQuery<T>);
    return this;
  }
}

export default QueryBuilder;
