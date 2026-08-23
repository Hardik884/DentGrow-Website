/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    /**
     * The SWC transform for styled-components.
     *
     * Without it, styled-components derives each component's id from module
     * evaluation order, which is not the same on the server as in the client
     * bundle. Every render then produced a different class name on one of the
     * components and React reported a hydration mismatch on load. The transform
     * assigns ids from the file and variable name instead, so both passes agree.
     */
    styledComponents: true,
  },
};

module.exports = nextConfig;
