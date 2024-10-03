import barcode from '../image/barcode.png';

const Footer = () => {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '550px',
            height: 'auto',
            overflow: 'hidden',
            boxSizing: 'border-box',
            display: 'flex',           // Flexbox 사용
            justifyContent: 'center',   // 수평 중앙 정렬
            alignItems: 'center',       // 수직 중앙 정렬 (필요시 사용)
            margin: '0 auto',           // 가로 중앙 정렬 보조
        }}>
            <div style={{
                textAlign: 'center',
                width: '100%',            // 자식 요소가 부모 너비를 차지하도록 설정
            }}>
                <hr style={{ margin: '0', padding: '0' }} />
                <img src={barcode} alt="Barcode" style={{ margin: '10px 0 0 0', padding: '0', width: '90%' }} />
            </div>
        </div>
    );
}

export default Footer;
