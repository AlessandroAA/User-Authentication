import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createRecipeAction } from "../../actions/recipesActions";
import Loading from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import "./CreateRecipe.css";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const recipeCreate = useSelector((state) => state.recipeCreate);
  const { loading, error, recipe } = recipeCreate;

  console.log(recipe);

  const resetHandler = () => {
    setTitle("");
    setIngredients("");
    setCategory("");
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createRecipeAction(title, ingredients, category));
    if (!title || !ingredients || !category) return;

    resetHandler();
    navigate("/myrecipes");
  };

  return (
    <MainScreen title="Add a Recipe...">
      <Card>
        <Card.Header>Add a new recipe:</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <div className="titleinput">
              <Form.Group controlId="title">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control
                  type="title"
                  value={title}
                  placeholder="What is the recipe called?"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="ingredientsinput">
              <Form.Group controlId="ingredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  value={ingredients}
                  placeholder="Enter the Ingredients"
                  rows={4}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </Form.Group>
            </div>
            {ingredients && (
              <Card>
                <Card.Header>Recipe Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{ingredients}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <div className="categoryinput">
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="content"
                  value={category}
                  placeholder="For example: Italian Cuisine"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
            </div>
            {loading && <Loading size={50} />}

            <div className="formbuttons">
              <Button type="submit" variant="primary">
                Add Recipe
              </Button>
              <Button className="mx-1" onClick={resetHandler} variant="danger">
                Reset Fields
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default CreateRecipe;
