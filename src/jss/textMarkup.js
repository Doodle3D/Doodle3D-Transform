export default {
  text: {
    lineHeight: '1.5',
    fontWeight: 'normal',
    '& h1, & h2, & h3, & p, & ol, & ul': {
      fontWeight: 'inherit',
      margin: '0.5em 0'
    },
    '& h1': {
      lineHeight: 1.2
    },
    '& ol, & ul': {
      padding: '0 0 0 1em'
    },
    '& img, & iframe': {
      maxWidth: '100%'
    },
    '& table': {
      wordWrap: 'break-word',
      width: '100%',
      tableLayout: 'fixed'
    },
    '& small': {
      fontWeight: 'lighter'
    }
  }
};
