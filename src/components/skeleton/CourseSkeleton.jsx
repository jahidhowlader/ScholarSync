import ContentLoader from 'react-content-loader';

const CourseSkeleton = props => (
    <ContentLoader speed={2} height={380} width="100%" {...props} backgroundColor='#d1bff2' className='border border-primary-color' >
        <rect x="0" y="" rx="0" ry="0" width="100%" height="200" />
        <rect x="20" y="220" rx="0" ry="0" width="80%" height="25" />
        <rect x="20" y="260" rx="0" ry="0" width="70%" height="20" />
        <rect x="20" y="290" rx="0" ry="0" width="60%" height="20" />
        {/* <rect x="20" y="300" rx="0" ry="0" width="50%" height="20" /> */}
        <rect x="250" y="345" rx="0" ry="0" width="100%" height="40" />
    </ContentLoader>
)

export default CourseSkeleton;