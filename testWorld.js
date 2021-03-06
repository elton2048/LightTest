function TestWorld() {
	var RaycastCallback = function() {
		this.m_hit = false;
	}
	RaycastCallback.prototype.ReportFixture = function(fixture, point, normal, fraction) {
		this.m_hit = true;
		this.m_point = point;
		this.m_normal = normal;
		return fraction;
	};
	
	// Camera setting
	camera.position.x = 9;
	camera.position.y = 2;
	camera.position.z = 100;
 
	/* var gravity = new b2Vec2(0, -10);
	   var world = new b2World(gravity); */

	var bd = new b2BodyDef();
	bd.position.Set(0, 10);
	var ground = world.CreateBody(bd);
	var groundBox = new b2PolygonShape();
	groundBox.SetAsBoxXY(10, 10);

	ground.CreateFixtureFromShape(groundBox, 0.0);

	var bodyDef = new b2BodyDef();
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(0, 60);
	var body = world.CreateBody(bodyDef);

	var dynamicBox = new b2PolygonShape;
	dynamicBox.SetAsBoxXY(5, 5);

	fixtureDef = new b2FixtureDef;
	fixtureDef.shape = dynamicBox;
	fixtureDef.density = 10;
	fixtureDef.friction = 5;
	fixtureDef.restitution = 0.5;
	body.CreateFixtureFromDef(fixtureDef);

	v0 = new b2Vec2(0, 10);
	v1 = new b2Vec2(-1, 0);
	v2 = new b2Vec2(-1, 0);

	callback = new RaycastCallback();
	fix = new b2Fixture.RayCast();

	world.RayCast(callback, v0, v2);

	var timeStep = 1/60;
	var velocityIterations = 6;
	var positionIteration = 2;

	for(var i = 0; i < 60; i++) {
		world.Step(timeStep, velocityIterations, positionIteration);
		var position = body.GetPosition();
		var angle = body.GetAngle();
		console.log(position.x + " " + position.y + " " + angle);
	}
	console.log(callback.m_point);


}
