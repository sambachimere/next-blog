// LIBRARYS
import { useDocumentData } from 'react-firebase-hooks/firestore';

// FIREBASE
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';

// UI & UX
import PostContent from '../../components/PostContent'

// STYLES
import styled from "../../styles/Post.module.css"

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  }
}

export async function getStaticPaths() {
  // Improve my Admin using SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return { 
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //    { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
      </aside>

    </main>
  )
}
