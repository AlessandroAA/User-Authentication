import React from "react";
import { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Accordion, Button, Card, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./MyRecipes.css";
import { useDispatch, useSelector } from "react-redux";
import { listRecipes } from "../../actions/recipesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyRecipes = () => {
  const dispatch = useDispatch();

  const recipeList = useSelector((state) => state.recipeList);
  const { loading, recipes, error } = recipeList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeCreate = useSelector((state) => state.recipeCreate);
  const { success: successCreate } = recipeCreate;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  console.log(recipes);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listRecipes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, successCreate]);

  return (
    <MainScreen title={`Welcome back ${userInfo.name}...`}>
      <Link to="/createrecipe">
        <Button
          style={{ marginLeft: 10, marginBottom: 6 }}
          size="lg"
          variant="secondary"
        >
          Add a new recipe
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {recipes?.reverse().map((recipe) => (
        <Accordion defaultActiveKey={["0"]} key={recipe._id}>
          <Accordion.Item eventkey="0">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontsize: 18,
                  }}
                >
                  <Accordion.Button as={Card.Text} variant="link">
                    {recipe.title}
                  </Accordion.Button>
                </span>

                <div>
                  <Button className="edit" href={`/recipe/${recipe._id}`}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(recipe._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse>
                <Card.Body>
                  <h4>
                    <Badge bg="success" text="light">
                      Category - {recipe.category}
                    </Badge>
                  </h4>

                  <blockquote className="blockquote mb-0">
                    <p>{recipe.ingredients}</p>
                    <footer className="blockquote-footer">
                      Created On{" "}
                      <cite title="Source Title">
                        {recipe.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyRecipes;
