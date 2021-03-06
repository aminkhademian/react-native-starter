import React from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Card from "components/Card";
import { fetchPosts } from "store/actions/posts";

class Feed extends React.Component {
  state = { page: 1, per: 10 };

  componentWillMount() {
    const { fetchAllPosts } = this.props;
    fetchAllPosts();
  }

  keyExtractor = item => item.id.toString();

  render() {
    const { per, page } = this.state;
    console.log("LOG:", page);
    const { navigation, posts } = this.props;
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={posts.slice(0, (page - 1) * per + per)}
        onEndReached={() => {
          this.setState({ page: page + 1 });
        }}
        renderItem={({ item }) => (
          <Card
            imageId={item.id}
            author={item.author}
            navigation={navigation}
          />
        )}
      />
    );
  }
}

Feed.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired,
  fetchAllPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllPosts: fetchPosts
    },
    dispatch
  );

const mapStateToProps = state => ({ posts: state.posts });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
