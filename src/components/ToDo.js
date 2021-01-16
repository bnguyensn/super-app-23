const formatDate = (date) => {
  return date.toLocaleString();
};

const formatDone = (done) => (done ? 'Yes' : 'No');

const getBkgColor = (color) => {
  switch (color) {
    case 'RED': {
      return '#ffcdd2';
    }
    case 'GREEN': {
      return '#c8e6c9';
    }
    case 'BLUE': {
      return '#bbdefb';
    }
    default: {
      return 'transparent';
    }
  }
};

export default function ToDo({ id, createdDate, tags, content, done, color }) {
  return (
    <ul
      style={{
        listStyleType: 'none',
        backgroundColor: getBkgColor(color),
      }}
    >
      <li>
        Created date: {createdDate ? formatDate(new Date(createdDate)) : null}
      </li>
      <li>Content: {content}</li>
      <li>Tags: {tags ? tags.join(', ') : ''}</li>
      <li>Done: {formatDone(done)}</li>
    </ul>
  );
}
