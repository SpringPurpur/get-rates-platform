<template>
    <div id="container">
        <h1>Request rates for one-piece shipment</h1>
        <form @submit.prevent="handleSubmit" class="form-grid">
            <div class="form-columns">
                <div class="left-column">
                    <label for="accountNumberTextInput">Account number:<span class="red-star">*</span>
                        <input type="text" id="accountNumberTextInput" v-model="accountNumberTextInput"
                            placeholder="Ex: 123456789" />
                    </label>

                    <label for="originCountryCodeTextInput">Origin country code:<span class="red-star">*</span>
                        <input type="text" id="originCountryCodeTextInput" v-model="originCountryCodeTextInput"
                            placeholder="Ex: RO" />
                    </label>

                    <label for="originPostalCodeTextInput">Origin postal code:
                        <input type="text" id="originPostalCodeTextInput" v-model="originPostalCodeTextInput"
                            placeholder="Ex: 123456" />
                    </label>

                    <label for="originCityNameTextInput">Origin city name:<span class="red-star">*</span>
                        <input type="text" id="originCityNameTextInput" v-model="originCityNameTextInput"
                            placeholder="Ex: BUCHAREST" />
                    </label>

                    <label for="destinationCountryCodeTextInput">Destination country code:<span
                            class="red-star">*</span>
                        <input type="text" id="destinationCountryCodeTextInput"
                            v-model="destinationCountryCodeTextInput" placeholder="Ex: US" />
                    </label>

                    <label for="destinationPostalCodeTextInput">Destination postal code:
                        <input type="text" id="destinationPostalCodeTextInput" v-model="destinationPostalCodeTextInput"
                            placeholder="Ex: 123456" />
                    </label>

                    <label for="destinationCityNameTextInput">Destination city name:<span class="red-star">*</span>
                        <input type="text" id="destinationCityNameTextInput" v-model="destinationCityNameTextInput"
                            placeholder="Ex: New York" />
                    </label>
                </div>

                <div class="right-column">
                    <label for="weightTextInput">Weight:<span class="red-star">*</span>
                        <input type="text" id="weightTextInput" v-model="weightTextInput" placeholder="Ex: 20" />
                    </label>

                    <label for="lengthTextInput">Length:<span class="red-star">*</span>
                        <input type="text" id="lengthTextInput" v-model="lengthTextInput" placeholder="Ex: 20" />
                    </label>

                    <label for="widthTextInput">Width:<span class="red-star">*</span>
                        <input type="text" id="widthTextInput" v-model="widthTextInput" placeholder="Ex: 20" />
                    </label>

                    <label for="heightTextInput">Height:<span class="red-star">*</span>
                        <input type="text" id="heightTextInput" v-model="heightTextInput" placeholder="Ex: 20" />
                    </label>

                    <label for="plannedShippingDateInput">Planned shipping date:<span class="red-star">*</span>
                        <input type="date" id="plannedShippingDateInput" v-model="plannedShippingDateInput" />
                    </label>
                </div>
            </div>

            <div class="bottom-section">
                <label for="isCustomsDeclarableInput">
                    Is this package customs declarable?
                    <input type='checkbox' id="isCustomsDeclarableInput" v-model="isCustomsDeclarableInput"
                        :true-value="'true'" :false-value="'false'" />
                </label>

                <fieldset>
                    <legend>Unit of measurement<span class="red-star">*</span></legend>
                    <label for="unitOfMeasurementImperial">Imperial</label>
                    <input type="radio" id="unitOfMeasurementImperial" v-model="unitOfMeasurementInput"
                        name="unitOfMeasurementInput" value="imperial" />

                    <label for="unitOfMeasurementMetric">Metric</label>
                    <input type="radio" id="unitOfMeasurementMetric" v-model="unitOfMeasurementInput"
                        name="unitOfMeasurementInput" value="metric" checked="true" />
                </fieldset>

                <label for="nextBusinessDayInput">
                    Deliver the next business day?
                    <input type="checkbox" id="nextBusinessDayInput" v-model="nextBusinessDayInput" :true-value="'true'"
                        :false-value="'false'">
                </label>

                <label for="strictValidationInput">
                    Strict DCT validation?
                    <input type="checkbox" id="strictValidationInput" v-model="strictValidationInput"
                        :disabled="!allFilled" :true-value="'true'" :false-value="'false'">
                </label>

                <label for="getAllValueAddedServicesInput">
                    List all value added services?
                    <input type="checkbox" id="getAllValueAddedServicesInput" v-model="getAllValueAddedServicesInput"
                        :true-value="'true'" :false-value="'false'">
                </label>

                <label for="requestEstimatedDeliveryDateInput">
                    Do you want an estimated delivery date?
                    <input type="checkbox" id="requestEstimatedDeliveryDateInput"
                        v-model="requestEstimatedDeliveryDateInput" :true-value="true" :false-value="false">
                </label>

                <fieldset v-if="requestEstimatedDeliveryDateInput">
                    <legend>Estimated delivery date type</legend>
                    <label for="estimatedDeliveryDateTypeQDDF">QDDF</label>
                    <input type="radio" id="estimatedDeliveryDateTypeQDDF" v-model="estimatedDeliveryDateInput"
                        name="estimatedDeliveryDateInput" value="QDDF" />

                    <label for="estimatedDeliveryDateTypeQDDC">QDDC</label>
                    <input type="radio" id="estimatedDeliveryDateTypeQDDC" v-model="estimatedDeliveryDateInput"
                        name="estimatedDeliveryDateInput" value="QDDC" />
                </fieldset>

                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useResponseStore } from '../stores/responseStore';
import axios from 'axios';

const router = useRouter();
const store = useResponseStore();

const accountNumberTextInput = ref<string>('');
const originCountryCodeTextInput = ref<string>('');
const originPostalCodeTextInput = ref<string>('');
const originCityNameTextInput = ref<string>('');
const destinationCountryCodeTextInput = ref<string>('');
const destinationPostalCodeTextInput = ref<string>('');
const destinationCityNameTextInput = ref<string>('');
const weightTextInput = ref<number | null>(null);
const lengthTextInput = ref<number | null>(null);
const widthTextInput = ref<number | null>(null);
const heightTextInput = ref<number | null>(null);
const plannedShippingDateInput = ref<string>('');
const isCustomsDeclarableInput = ref<boolean>(false);
const unitOfMeasurementInput = ref<'metric' | 'imperial'>('metric');
const nextBusinessDayInput = ref<boolean>(false);

const allFilled = computed(() =>
    originPostalCodeTextInput.value.trim() !== '' &&
    destinationPostalCodeTextInput.value.trim() !== ''
)

const strictValidationInput = ref<boolean>(false);
const getAllValueAddedServicesInput = ref<boolean>(false);
const requestEstimatedDeliveryDateInput = ref<boolean>(false);
const estimatedDeliveryDateInput = ref<'QDDC' | 'QDDF'>('QDDF');

async function handleSubmit() {
    try {
        const payloadArray: [string, any][] = [
            ['accountNumber', accountNumberTextInput.value.toString()],
            ['originCountryCode', originCountryCodeTextInput.value.toString()],
            ['originPostalCode', originPostalCodeTextInput.value ? originPostalCodeTextInput.value.toString() : undefined],
            ['originCityName', originCityNameTextInput.value.toString()],
            ['destinationCountryCode', destinationCountryCodeTextInput.value.toString()],
            ['destinationPostalCode', destinationPostalCodeTextInput.value ? destinationPostalCodeTextInput.value.toString() : undefined],
            ['destinationCityName', destinationCityNameTextInput.value.toString()],
            ['weight', weightTextInput.value],
            ['length', lengthTextInput.value],
            ['width', widthTextInput.value],
            ['height', heightTextInput.value],
            ['plannedShippingDate', plannedShippingDateInput.value.toString()],
            ['isCustomsDeclarable', isCustomsDeclarableInput.value],
            ['unitOfMeasurement', unitOfMeasurementInput.value],
            ['nextBusinessDay', nextBusinessDayInput.value ? nextBusinessDayInput.value : undefined],
            ['strictValidation', strictValidationInput.value ? strictValidationInput.value : undefined],
            ['getAllValueAddedServices', getAllValueAddedServicesInput.value ? getAllValueAddedServicesInput.value : undefined],
            ['requestEstimatedDeliveryDate', requestEstimatedDeliveryDateInput.value ? requestEstimatedDeliveryDateInput.value : undefined],
            ['estimatedDeliveryDate', (estimatedDeliveryDateInput.value && requestEstimatedDeliveryDateInput.value) ? estimatedDeliveryDateInput.value.toString() : undefined]
        ];

        const filteredPayload = Object.fromEntries(payloadArray.filter(([_, value]) => value !== undefined && value !== null));

        // console.log(filteredPayload);
        const response = await axios.post('http://localhost:3000', filteredPayload);

        store.setSuccess(response.data, response.status);
        router.push('/response');



        // responseString.value = JSON.stringify(response.data, null, 2);
        // console.log('Response:', response.data);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data || { message: 'Unexpected error' };
        store.setError(message, status);
        router.push('/response');
    }
}
</script>

<style scoped>
.form-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-columns {
    display: flex;
    justify-content: center;
    gap: 2rem;
}

.left-column,
.right-column {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 400px;
}

.bottom-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
}

#container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 200px;
    margin: 0 auto;
}

input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
}

button {
    padding: 8px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    /* Stretch button across the full width */
    padding: 10px;
    background-color: #f1c40f;
    color: white;
    border: none;
}

button:hover {
    background-color: #e74c3c;
    color: white;
}

.red-star {
    color: red;
}
</style>