import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js";
import { InsightService } from "@buf/safedep_api.connectrpc_es/safedep/services/insights/v2/insights_connect.js";
import { createPromiseClient, Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

function authenticationInterceptor(token: string, tenant: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("authorization", token);
    req.header.set("x-tenant-id", tenant);
    return await next(req);
  };
}

export async function getPackageVersionInsightData() {
  const token = process.env.SAFEDEP_API_KEY;
  const tenantId = process.env.SAFEDEP_TENANT_ID;
  console.log("API Key:", token);
  console.log("Tenant ID:", tenantId);

  if (!token) {
    console.error("API Key  is missing");
    throw new Error("API Key  is missing");
  }

  if (!tenantId) {
    console.error(" Tenant ID is missing");
    throw new Error("Tenant ID is missing");
  }

  const transport = createConnectTransport({
    baseUrl: "https://api.safedep.io",
    // httpVersion: "1.1",
    interceptors: [authenticationInterceptor(token, tenantId)],
  });
  console.log("Transport created",transport);

  const client = createPromiseClient(InsightService, transport);

  console.log("Making API call...");
  const res = await client.getPackageVersionInsight({
    packageVersion: {
      package: {
        ecosystem: Ecosystem.GO,
        name: "github.com/safedep/vet",
      },
      version: "v1.8.9"
    }
  })
    console.log("API Response:", res.toJson()); // Logs the full response
    return res.toJson(); // Return the object directly (not JSON stringified)
//   } catch (error) {
//     console.error("Error in API request:", error);
//     throw new Error("Error fetching data from API");
//   }
}
