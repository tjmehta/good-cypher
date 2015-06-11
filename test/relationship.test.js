var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var expect = Code.expect;

var Relationship = require('../relationship');

describe('Relationship -', function () {
  var ctx;

  describe('constructor and toString()', function () {
    beforeEach(function (done) {
      ctx = {};
      ctx.args = [];
      done();
    });

    it('should create a relationship',
      shouldCreateARelationship);

    describe('w/ nameLabel arg', function () {
      beforeEach(function (done) {
        ctx.nameLabel = 'name';
        ctx.args.push(ctx.nameLabel);
        done();
      });

      it('should create a relationship w/ name',
        shouldCreateARelationship);

      it('should create a relationship w/ label', function (done) {
        ctx.nameLabel = ':label';
        ctx.args[0] = ctx.nameLabel;
        shouldCreateARelationship(done);
      });

      it('should create a relationship w/ name and label', function (done) {
        ctx.nameLabel = 'name:label';
        ctx.args[0] = ctx.nameLabel;
        shouldCreateARelationship(done);
      });


      describe('w/ props arg', function () {
        beforeEach(function (done) {
          ctx.props = {};
          ctx.args.push(ctx.props);
          done();
        });

        it('should create a relationship w/ name, label, and props',
          shouldCreateARelationship);

        descWithDirection('name, props and');
      });

      descWithDirection('name and');
    });

    describe('w/ props arg', function () {
      beforeEach(function (done) {
        ctx.props = {};
        ctx.args.push(ctx.props);
        done();
      });

      it('should create a relationship w/ props',
        shouldCreateARelationship);

      descWithDirection('props and');
    });

    descWithDirection();

    function descWithDirection (msg) {
      msg = msg || '';

      describe('w/ direction >', function () {
        beforeEach(function (done) {
          ctx.direction = '>';
          ctx.args.push(ctx.direction);
          done();
        });

        it('should create a relationship w/ ' + msg + ' direction',
          shouldCreateARelationship);
      });

      describe('w/ direction <', function () {
        beforeEach(function (done) {
          ctx.direction = '<';
          ctx.args.push(ctx.direction);
          done();
        });

        it('should create a relationship w/ ' + msg + ' direction',
          shouldCreateARelationship);
      });
    }
    function shouldCreateARelationship (done) {
      var r = createRelationship.apply(null, ctx.args);
      assertRelationship(ctx, r);
      done();
    }
  });



  describe('node(...)', function () {
    var ctx;
    beforeEach(function (done) {
      ctx = {};
      ctx.r = createRelationship();
      done();
    });

    it('should return a node', function (done) {
      var Node = require('../node.js');
      var node = ctx.r.node();
      expect(node).to.be.an.instanceof(Node);
      expect(ctx.r._graph).to.equal(node._graph);
      expect(ctx.r._graph[0]).to.equal(ctx.r);
      expect(ctx.r._graph[1]).to.equal(node);
      done();
    });
  });



  describe('constructor errors', function () {

    it('should throw an error if invalid name label', function (done) {
      expect(createRelationship.bind(null, /what/))
        .to.throw(/name/);
      done();
    });

    it('should throw an error in invalid props', function (done) {
      expect(createRelationship.bind(null, 'name', /what/))
        .to.throw(/props/);
      done();
    });

    it('should throw an error in invalid direction', function (done) {
      expect(createRelationship.bind(null, 'name', {}, /what/))
        .to.throw(/direction/);
      done();
    });
  });
});



function createRelationship (arg1, arg2, arg3) {
  return new Relationship(arg1, arg2, arg3);
}

function assertRelationship (ctx, relationship) {
  expect(relationship).to.exist();
  expect(relationship).to.be.an.instanceof(Relationship);
  if (ctx.nameLabel) {
    expect(relationship.nameLabel).to.equal(ctx.nameLabel);
  }
  if (ctx.props) {
    expect(relationship.props).to.deep.equal(ctx.props);
  }
  if (ctx.direction) {
    expect(relationship.direction).to.equal(ctx.direction);
  }
  expect(relationship.toString())
    .to.equal(
      expectedString(ctx.nameLabel, ctx.props, ctx.direction)
    );

  function expectedString (nameLabel, props, direction) {
    if (!nameLabel && !props && !direction) {
      return '--';
    }
    if (nameLabel && !props && !direction) {
      return [
        '-[',
        nameLabel,
        ']-'
      ].join('');
    }
    if (nameLabel &&  props && !direction) {
      return [
        '-[',
        nameLabel,
        ' ',
        JSON.stringify(props),
        ']-'
      ].join('');
    }
    if (nameLabel &&  props &&  direction) {
      return [
        direction === '<' ? '<' : '',
        '-[',
        nameLabel,
        ' ',
        JSON.stringify(props),
        ']-',
        direction === '>' ? '>' : ''
      ].join('');
    }
    if (!nameLabel &&  props &&  direction) {
      return [
        direction === '<' ? '<' : '',
        '-[',
        JSON.stringify(props),
        ']-',
        direction === '>' ? '>' : ''
      ].join('');
    }
    if (!nameLabel && !props &&  direction) {
      return [
        direction === '<' ? '<' : '',
        '-',
        '-',
        direction === '>' ? '>' : ''
      ].join('');
    }
    if (!nameLabel &&  props && !direction) {
      return [
        '-[',
        JSON.stringify(props),
        ']-'
      ].join('');
    }
    if (nameLabel && !props &&  direction) {
      return [
        direction === '<' ? '<' : '',
        '-[',
        nameLabel,
        ']-',
        direction === '>' ? '>' : ''
      ].join('');
    }
  }
}