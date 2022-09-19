
// module.exports = {
//   future: {
//     webpack5: true
//   },
//   webpack: (config) => {
//     // load worker files as a urls with `file-loader`
//     config.module.rules.unshift(
//     //   {
//     //   test: /pdf\.worker\.(min\.)?js/,
//     //   use: [
//     //     {
//     //       loader: "file-loader",
//     //       options: {
//     //         name: "[contenthash].[ext]",
//     //         publicPath: "_next/static/worker",
//     //         outputPath: "static/worker"
//     //       }
//     //     }
//     //   ]
//     // },
    
//     {
//       test: /\.(pdf)$/,
//       use: [
//         {
//           loader: "file-loader",
//           options: {}
//         }
//       ]
//     }
//     );

//     return config;
//   }
// };

module.exports = {  
  reactStrictMode: true,
  // basePath: '/docs',
  // rewrites() {
  //   return [
  //     { source: '/docs', destination: '/' }
  //   ]
  // },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    });
    return config;
  }
}