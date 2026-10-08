const assert = require('node:assert');
const { ccRow, budgetRow, apply } = require('./lib.js');

const ccs = [
  { id: '1', name: 'Business', state: 'active', resources: [{ type: 'User', name: 'a' }] },
  { id: '2', name: '901-Devs', state: 'active', resources: [{ type: 'EnterpriseTeam', name: 't' }, { type: 'User', name: 'b' }] },
  { id: '3', name: 'old', state: 'deleted', resources: [] },
].map(ccRow);

assert.deepStrictEqual(apply(ccs).map((r) => r.id), ['2', '1', '3']);
assert.deepStrictEqual(apply(ccs, { q: 'DEV' }).map((r) => r.id), ['2']);
assert.deepStrictEqual(apply(ccs, { filters: { state: 'deleted' } }).map((r) => r.id), ['3']);
assert.deepStrictEqual(apply(ccs, { filters: { types: 'User' } }).map((r) => r.id), ['2', '1']);
assert.deepStrictEqual(apply(ccs, { sort: 'resources', dir: -1 }).map((r) => r.id), ['2', '1', '3']);

const bs = [
  { id: 'a', budget_scope: 'user', user: 'kshitiz99', budget_amount: 10000, consumed_amount: 1889.43, budget_product_sku: 'ai', prevent_further_usage: true },
  { id: 'b', budget_scope: 'cost_center', budget_entity_name: 'Chet', budget_amount: 5000, consumed_amount: 0, budget_product_sku: 'actions', prevent_further_usage: false },
  { id: 'c', budget_scope: 'enterprise', budget_amount: 0, budget_product_sku: 'ai', prevent_further_usage: true },
].map(budgetRow);

assert.strictEqual(bs[0].name, 'kshitiz99');
assert.strictEqual(bs[2].pct, 0);
assert.deepStrictEqual(apply(bs, { sort: 'pct', dir: -1 }).map((r) => r.id)[0], 'a');
assert.deepStrictEqual(apply(bs, { filters: { stop: 'no' } }).map((r) => r.id), ['b']);
assert.deepStrictEqual(apply(bs, { filters: { scope: 'user', sku: 'ai' } }).map((r) => r.id), ['a']);
console.log('ok');
