import { FrontendApi, Configuration } from "@ory/client";

// Use the proxy on port 3000 instead of direct Kratos connection
const ory = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:3000/kratos",
    baseOptions: {
      withCredentials: true, // Important for cookies
    }
  })
);

export { ory };

export async function signup(email: string, name: string, password: string) {
  try {
    // Start a native registration flow
    const { data: flow } = await ory.createNativeRegistrationFlow();

    // Submit registration data
    const result = await ory.updateRegistrationFlow({
      flow: flow.id,
      updateRegistrationFlowBody: {
        method: "password",
        password,
        traits: { email, name, role: "user" },
      },
    });

    return result;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}