import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as swc from '@swc/core';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Set the target to ES2015 or earlier
        // This will ensure that SWC is used for compilation
        // during the build process.
        esModule: false,
      },
      // Add a custom build step to use SWC
      plugins: [
        {
          name: 'custom-swc',
          async transform(code) {

            // Specify SWC options here
            const swcOptions = {
              "env": {
                "targets": {
                  "chrome": "58",
                  "ie": "11"
                }
              }
            };

            // Transform the code using SWC
            const transformedCode = await swc.transform(code, swcOptions);

            return {
              code: transformedCode.code,
              map: transformedCode.map,
            };
          },
        },
      ],
    },
  },
})
