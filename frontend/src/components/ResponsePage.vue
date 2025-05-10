<script setup lang="ts">
import { useResponseStore } from '../stores/responseStore';
import { computed } from 'vue';
const store = useResponseStore();

const products = computed(() => store.data?.products || []);
</script>

<template>
    <div>
      <div v-if="store.status === 200">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="product-card"
        >
          <h3 class="product-name">Product: {{ product.productName ?? '-' }}</h3>
  
          <!-- Basic Info -->
          <table class="data-table">
            <tbody>
              <tr>
                <td class="label">Product Code</td>
                <td>{{ product.productCode ?? '-' }}</td>
              </tr>
              <tr>
                <td class="label">Local Product Code</td>
                <td>{{ product.localProductCode ?? '-' }}</td>
              </tr>
              <tr>
                <td class="label">Country Code</td>
                <td>{{ product.localProductCountryCode ?? '-' }}</td>
              </tr>
              <tr>
                <td class="label">Network Type</td>
                <td>{{ product.networkTypeCode ?? '-' }}</td>
              </tr>
              <tr>
                <td class="label">Customer Agreement</td>
                <td>{{ product.isCustomerAgreement ?? '-' }}</td>
              </tr>
            </tbody>
          </table>
  
          <!-- Weight -->
          <h4 class="section-title">Weight</h4>
          <table class="data-table">
            <thead>
              <tr>
                <th>Volumetric</th>
                <th>Provided</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ product.weight?.volumetric ?? '-' }}</td>
                <td>{{ product.weight?.provided ?? '-' }}</td>
                <td>{{ product.weight?.unitOfMeasurement ?? '-' }}</td>
              </tr>
            </tbody>
          </table>
  
          <!-- Total Price -->
          <h4 class="section-title">Total Price</h4>
          <table class="data-table">
            <thead>
              <tr>
                <th>Currency Type</th>
                <th>Currency</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(price, i) in product.totalPrice" :key="i">
                <td>{{ price.currencyType ?? '-' }}</td>
                <td>{{ price.priceCurrency ?? '-' }}</td>
                <td>{{ price.price ?? '-' }}</td>
              </tr>
            </tbody>
          </table>
  
          <!-- Total Price Breakdown -->
          <h4 class="section-title">Total Price Breakdown</h4>
          <div v-for="(entry, i) in product.totalPriceBreakdown" :key="i">
            <p class="subheading">
              Currency: {{ entry.priceCurrency ?? '-' }} ({{ entry.currencyType ?? '-' }})
            </p>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Type Code</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p, j) in entry.priceBreakdown" :key="j">
                  <td>{{ p.typeCode ?? '-' }}</td>
                  <td>{{ p.price ?? '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Detailed Price Breakdown -->
          <h4 class="section-title">Detailed Price Breakdown</h4>
          <div
            v-for="(entry, i) in product.detailedPriceBreakdown"
            :key="i"
            class="mb-block"
          >
            <p class="subheading">
              Currency: {{ entry.priceCurrency ?? '-' }} ({{ entry.currencyType ?? '-' }})
            </p>
  
            <table class="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Tariff Formula</th>
                  <th colspan="5">Price Breakdown (per service)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(bd, j) in entry.breakdown" :key="j">
                  <td>{{ bd.name ?? '-' }}</td>
                  <td>{{ bd.serviceCode ?? '-' }}</td>
                  <td>{{ bd.typeCode ?? '-' }}</td>
                  <td>{{ bd.price ?? '-' }}</td>
                  <td>{{ bd.tariffRateFormula ?? '-' }}</td>
                  <td colspan="5">
                    <table class="data-table inner-table">
                      <thead>
                        <tr>
                          <th>Price Type</th>
                          <th>Type Code</th>
                          <th>Price</th>
                          <th>Rate</th>
                          <th>Base Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="!bd.priceBreakdown || bd.priceBreakdown.length === 0">
                          <td colspan="5">-</td>
                        </tr>
                        <tr v-for="(pb, k) in bd.priceBreakdown" :key="k">
                          <td>{{ pb.priceType ?? '-' }}</td>
                          <td>{{ pb.typeCode ?? '-' }}</td>
                          <td>{{ pb.price ?? '-' }}</td>
                          <td>{{ pb.rate ?? '-' }}</td>
                          <td>{{ pb.basePrice ?? '-' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <div v-else>
        <h2 class="error-title">Error {{ store.status }}</h2>
        <p>{{ store.data?.detail || 'An unexpected error occurred.' }}</p>
      </div>
    </div>
  </template>

<style scoped>
.success-title,
.error-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.product-card {
  margin-bottom: 2.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.section-title {
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.subheading {
  font-weight: 500;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}

.label {
  font-weight: 600;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.inner-table {
  margin-top: 0.5rem;
}

</style>
