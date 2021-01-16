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
    <div
      style={{
        backgroundColor: getBkgColor(color),
      }}
    >
      <div>Created date: {formatDate(new Date(createdDate))}</div>
      <div>Content: {content}</div>
      <div>Tags: {tags.join(',')}</div>
      <div>Done: {formatDone(done)}</div>
    </div>
  );
}
