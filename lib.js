// Pure helpers shared by index.html and test.js.
const norm = (v) => String(v ?? '').toLowerCase();

const ccRow = (c) => ({
  id: c.id,
  name: c.name,
  state: c.state || 'active',
  types: [...new Set((c.resources || []).map((r) => r.type))],
  resources: (c.resources || []).length,
  members: (c.resources || []).map((r) => r.name).join(' '), // so search finds a cost center by org/team/user
  azure: c.azure_subscription || '',
});

const budgetRow = (b) => ({
  id: b.id,
  name: b.budget_entity_name || b.user || (b.budget_scope === 'enterprise' ? '(enterprise)' : ''),
  scope: b.budget_scope,
  sku: b.budget_product_sku || '',
  amount: b.budget_amount ?? 0,
  spent: b.consumed_amount ?? 0,
  pct: b.budget_amount ? (b.consumed_amount ?? 0) / b.budget_amount : 0,
  stop: b.prevent_further_usage ? 'yes' : 'no',
});

// filters: { key: value } exact match ('' = any); array fields match by inclusion.
function apply(rows, { q = '', filters = {}, sort = 'name', dir = 1 } = {}) {
  const needle = norm(q).trim();
  return rows
    .filter((r) => !needle || Object.values(r).some((v) => norm(v).includes(needle)))
    .filter((r) => Object.entries(filters).every(([k, v]) =>
      !v || (Array.isArray(r[k]) ? r[k].includes(v) : String(r[k]) === v)))
    .sort((a, b) => {
      const x = a[sort], y = b[sort];
      const c = typeof x === 'number' && typeof y === 'number'
        ? x - y
        : String(x).localeCompare(String(y), undefined, { numeric: true, sensitivity: 'base' });
      return c * dir;
    });
}

if (typeof module !== 'undefined') module.exports = { ccRow, budgetRow, apply };
