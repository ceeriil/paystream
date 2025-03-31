# Paystream Developer Documentation

This is a detailed guide on how to contribute to Paystream. For instructions on running the project, check the main README.

## 🛠️ Tech Stack

Paystream is built primarily with:

- **Next.js** for the frontend
- **Reown** for the wallet kit
- **Streamflow** for handling payments ([Streamflow Docs](https://js-sdk-docs.streamflow.finance/))

## 📂 Key Components

- The main component for creating a payment is located in **(folder path)**.
- When payment details are selected in the form:
  - The form should dynamically adjust based on the selected payment type.
  - Example: The **cliff** field should only appear when the user selects the `freelance-payment` option.
- In the **configuration** step of the stepper form:
  - Check whether the user is on **testnet** or **mainnet**.
  - If on **devnet**, the form should use **USDC dev** from the **CFaucet** with mint address **(replace with mint address)**.

## 🛡️ Form Validation & Submission

- Form validation is handled with **Zod** to minimize failed payments due to incorrect input.
- If a transaction fails, an error message should be displayed in a **modal**.
- The main payment types use the **Streamflow Vesting SDK**.

### 🔄 Submission Flow

1. **Validate the form** using Zod.
2. **Check if the user's wallet is connected and authenticated**:
   - If not, show the **connection modal**.
3. **Convert the user's form values** to match the expected types for Streamflow.
4. **Set Streamflow configurable values** based on the selected payment type:
   - Example: Selecting **Commitment Payment** should set `cancellable: false`.
   - _(This feature is yet to be implemented.)_
5. **Revalidate network selection** (testnet or mainnet) before assigning the mint address.
6. **Create Stream Params** and let **Streamflow process the transaction**.
7. Show a **success or error message** based on the transaction outcome.
8. **Redirect to the dashboard** if the transaction is successful.

## 🚀 Contributing

If you encounter any issues or have suggestions, feel free to open a pull request or reach out for support!
