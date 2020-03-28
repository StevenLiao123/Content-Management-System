/*
    The moudle to contain some constants
*/

export const BASE = process.env.NODE_ENV === "production" ? "https://floating-beyond-26711.herokuapp.com" : "http://localhost:8080"; // the base url of the project based on the development environment
export const CATEGORY_PAGE_SIZE = 6; // the default page size of product
export const PRODUCT_PAGE_SIZE = 5; // the default page size of product
export const BASE_IMG_AWS_URL = "https://content-management-system.s3-ap-southeast-2.amazonaws.com/"; // the url of the AWS S3