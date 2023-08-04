import Head from "next/head";

interface headProps {
  title?: string;
  description?: string;
  image?: string;
}

const HEAD = ({ title, description, image }: headProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
};

export default HEAD;
