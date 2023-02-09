- getStaticPaths with fallback: true
  we need to use router.isFallback to show a loading state in the page component
  we need to return object with key { notFound: true } if the page is not found in getStaticProps
- getStaticPaths with fallback: "blocking"
  we don't need to use router.isFallback to show a loading state in the page component
  we need to return object with key { notFound: true } if the page is not found in getStaticProps
