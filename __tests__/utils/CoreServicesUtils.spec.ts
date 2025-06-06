import { CoreServicesGeoNamesMapping, createCoreServicesOrgUrl, getCoreServicesGeoName, isCoreServicesOrgUrl, unqOrgUrlPattern } from "../../src/utils/CoreServicesUtils";

describe("CoreServicesUtils", () => {
    it("unqOrgUrlPattern should be able to retrieve the location code from the an UNQ OrgUrl", () => {
        const locationCode = "crm";
        const orgUrl = `https://unq1234-${locationCode}.omnichannelengagementhub.com`;
        const result = unqOrgUrlPattern.exec(orgUrl);

        expect(result).not.toBe(null);
        if (!result) throw new Error("No result object");

        expect(result[1]).toBe(locationCode);
        expect(createCoreServicesOrgUrl("1234", getCoreServicesGeoName(locationCode))).toBe(`https://m-1234.us.omnichannelengagementhub.com`);
    });

    it("unqOrgUrlPattern should be able to retrieve the location code from the an custom UNQ OrgUrl", () => {
        const locationCode = "crmtest";
        const orgUrl = `https://unq1234-${locationCode}.oc.crmlivetie.com`;
        const result = unqOrgUrlPattern.exec(orgUrl);

        expect(result).not.toBe(null);
        if (!result) throw new Error("No result object");
        expect(result[1]).toBe(locationCode);
        expect(createCoreServicesOrgUrl("1234", getCoreServicesGeoName(locationCode))).toBe(`https://m-1234.test.omnichannelengagementhub.com`);
    });

    it("unqOrgUrlPattern should be able to retrieve the location code from the an UNQ OrgUrl with a different domain", () => {
        const locationCode = "crm10";
        const orgUrl = `https://unq1234-${locationCode}.oc.crmlivetie.com`;
        const result = unqOrgUrlPattern.exec(orgUrl);

        expect(result).not.toBe(null);
        if (!result) throw new Error("No result object");
        expect(result[1]).toBe(locationCode);
        expect(createCoreServicesOrgUrl("1234", getCoreServicesGeoName(locationCode))).toBe(`https://m-1234.preprod.omnichannelengagementhub.com`);
    });

    it("unqOrgUrlPattern should be able to retrieve the location code from the an UNQ OrgUrl with a different top-level domain", () => {
        const locationCode = "crm12";
        const orgUrl = `https://unq1234-${locationCode}.omnichannelengagementhub.us`;
        const result = unqOrgUrlPattern.exec(orgUrl);

        expect(result).not.toBe(null);
        if (!result) throw new Error("No result object");
        expect(result[1]).toBe(locationCode);
        expect(createCoreServicesOrgUrl("1234", getCoreServicesGeoName(locationCode))).toBe(`https://m-1234.fr.omnichannelengagementhub.com`);
    });

    it("unqOrgUrlPattern with 'crm9' should use 'omnichannelengagementhub.us' as domain name", () => {
        const locationCode = "crm9";
        const orgUrl = `https://unq1234-${locationCode}.omnichannelengagementhub.us`;
        const result = unqOrgUrlPattern.exec(orgUrl);

        expect(result).not.toBe(null);
        if (!result) throw new Error("No result object");
        expect(result[1]).toBe(locationCode);
        expect(createCoreServicesOrgUrl("1234", getCoreServicesGeoName(locationCode))).toBe(`https://m-1234.gov.omnichannelengagementhub.us`);
    });

    it("unqOrgUrlPattern except 'crm9' should use 'omnichannelengagementhub.com' as domain name", () => {
        const domain = "omnichannelengagementhub.com";
        const ignoreLocationCodeList = ["crm9"];
        for (const locationCode in CoreServicesGeoNamesMapping) {
            if (ignoreLocationCodeList.includes(locationCode)) {
                continue;
            }

            const orgId = "1234";
            const geoName = getCoreServicesGeoName(locationCode);
            const coreServicesOrgUrl = createCoreServicesOrgUrl(orgId, geoName);
            expect(coreServicesOrgUrl).toBe(`https://m-${orgId}.${geoName}.${domain}`);
        }
    });

    it("getCoreServicesGeoName() should return the proper geo name based on location code", () => {
        for (const locationCode in CoreServicesGeoNamesMapping) {
            const geoName = CoreServicesGeoNamesMapping[locationCode];
            const result = getCoreServicesGeoName(locationCode);
            expect(result).toBe(geoName);
        }
    });

    it("getCoreServicesGeoName() should return \"\" if the location code does not exist", () => {
        const locationCode = "NA";
        const result = getCoreServicesGeoName(locationCode);
        expect(result).toBe("");
    });

    it("isCoreServicesOrgUrl() should return \"true\" if orgUrl is a CoreServices OrgUrl", () => {
        const orgUrl = "https://m-[orgId].[geoName].omnichannelengagementhub.com";
        const result = isCoreServicesOrgUrl(orgUrl);
        expect(result).toBe(true);
    });

    it("isCoreServicesOrgUrl() should return \"false\" if orgUrl is NOT a CoreServices OrgUrl", () => {
        const orgUrl = "https://unq[orgId]-[locationCode].omnichannelengagementhub.com";
        const result = isCoreServicesOrgUrl(orgUrl);
        expect(result).toBe(false);
    });
});