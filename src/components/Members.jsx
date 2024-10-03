import PropTypes from "prop-types"; // Import PropTypes for validation

const getStatusStyle = (status) => {
    switch (status) {
        case "완료":
            return { backgroundColor: "rgba(0, 255, 0, 1)" }; // 초록색
        case "진행중":
            return { backgroundColor: "rgba(255, 165, 0, 0.7)" }; // 주황색
        case "미실시":
            return { backgroundColor: "rgba(128, 128, 128, 0.3)" }; // 회색
        default:
            return { backgroundColor: "rgba(128, 128, 128, 0.3)" }; // 기본값 (회색)
    }
};

const Members = ({ members, toggleStatus }) => {
    return (
        <div className="member-status">
            <ul className="member-list">
                {members.map((member, index) => {
                    // receiptContentsPerMember가 있으면 완료, 없으면 진행중으로 상태를 설정
                    const memberStatus = member.receiptContentsPerMember && member.receiptContentsPerMember.length > 0 ? "완료" : "진행중";

                    return (
                        <p key={member.memberId || index} className="circle" style={getStatusStyle(memberStatus)} onClick={() => toggleStatus && toggleStatus(index)}>
                            {member.memberName ? member.memberName.charAt(0) : "?"}
                            <span className="tooltip">{member.isLeader ? `${member.memberName} (리더)` : member.memberName || "Unknown"}</span>
                        </p>
                    );
                })}
            </ul>
        </div>
    );
};

Members.propTypes = {
    members: PropTypes.arrayOf(
        PropTypes.shape({
            memberId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            memberName: PropTypes.string.isRequired,
            receiptContentsPerMember: PropTypes.array, // receiptContentsPerMember에 따라 상태가 결정됨
            isLeader: PropTypes.bool,
        })
    ).isRequired,
    toggleStatus: PropTypes.func, // optional로 변경
};

export default Members;
