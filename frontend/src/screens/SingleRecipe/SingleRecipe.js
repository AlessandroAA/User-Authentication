import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipeAction } from "../../actions/recipesActions";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/ErrorMessage";

const SingleRecipe = () => {
  const [title, setTitle] = useState();
  const [ingredients, setIngredients] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState();

  const dispatch = useDispatch();

  const recipeUpdate = useSelector((state) => state.recipeUpdate);
  const { loading, error } = recipeUpdate;

  // const recipeDelete = useSelector((state) => state.recipeDelete);
  // const { loading: loadingDelete, error: errorDelete } = recipeDelete;

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     dispatch(deleteRecipeAction(id));
  //   }
  //   history.push("/myrecipes");
  // };

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/recipes/${id}`);

      setTitle(data.title);
      setIngredients(data.ingredients);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetchData();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setIngredients("");
    setCategory("");
  };

  const navigate = useNavigate();

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateRecipeAction(id, title, ingredients, category));
    if (!title || !ingredients || !category) return;

    resetHandler();
    navigate("/myrecipes");
  };

  return (
    <MainScreen title="Edit Recipe">
      <Card>
        <Card.Header>Edit your Recipe</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {/* {loadingDelete && <Loading />} */}
            {/* {errorDelete && (
                  <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
               )} */}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="ingredients">
              <Form.Label>Ingredients</Form.Label>.
              <Form.Control
                as="textarea"
                placeholder="Enter the Ingredients"
                rows={4}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </Form.Group>
            {ingredients && (
              <Card>
                <Card.Header>Recipe Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{ingredients}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Recipe
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              // onClick={() => deleteHandler(match.params.id)}
            >
              Delete Recipe
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updating On - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleRecipe;
