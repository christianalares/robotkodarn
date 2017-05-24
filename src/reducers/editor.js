import { handleActions } from 'redux-actions'

export default handleActions({
	SET_EDITOR_TAB: (state, action) => {
		return ({
			...state,
			activeTab: action.payload
		})
	},

	UPDATE_CODE: (state, action) => {
		return ({
			...state,
			updatedCode: action.payload
		})
	},
}, {
	activeTab: 'user',
	updatedCode: `void setup() {
    pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(200);
    digitalWrite(LED_BUILTIN, LOW);
    delay(200);
}`
})
