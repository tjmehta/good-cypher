var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var expect = Code.expect;

var Node = require('../node.js');

describe('Node -', function () {
  var ctx;

  describe('constructor and toString()', function () {

    describe('constructor and toString()', function () {
      beforeEach(function (done) {
        ctx = {};
        ctx.args = [];
        done();
      });

      it('should create a node',
        shouldCreateANode);

      describe('w/ nameLabel arg', function () {
        beforeEach(function (done) {
          ctx.nameLabel = 'name';
          ctx.args.push(ctx.nameLabel);
          done();
        });

        it('should create a node w/ name',
          shouldCreateANode);

        it('should create a node w/ label', function (done) {
          ctx.nameLabel = ':label';
          ctx.args[0] = ctx.nameLabel;
          shouldCreateANode(done);
        });

        it('should create a node w/ name and label', function (done) {
          ctx.nameLabel = 'name:label';
          ctx.args[0] = ctx.nameLabel;
          shouldCreateANode(done);
        });


        describe('w/ props arg', function () {
          beforeEach(function (done) {
            ctx.props = {};
            ctx.args.push(ctx.props);
            done();
          });

          it('should create a node w/ name, label, and props',
            shouldCreateANode);
        });
      });
    });
  });

  function shouldCreateANode (done) {
    var r = createNode.apply(null, ctx.args);
    assertNode(ctx, r);
    done();
  }
});

function createNode (arg1, arg2) {
  return new Node(arg1, arg2);
}

function assertNode (ctx, node) {
  expect(node).to.exist();
  expect(node).to.be.an.instanceof(Node);
  if (ctx.nameLabel) {
    expect(node.nameLabel).to.equal(ctx.nameLabel);
  }
  if (ctx.props) {
    expect(node.props).to.deep.equal(ctx.props);
  }
  expect(node.toString())
    .to.equal(
      expectedString(ctx.nameLabel, ctx.props)
    );

  function expectedString (nameLabel, props) {
    if (!nameLabel && !props) {
      return '()';
    }
    if (nameLabel && !props) {
      return [
        '(',
        nameLabel,
        ')'
      ].join('');
    }
    if (!nameLabel &&  props) {
      return [
        '(',
        JSON.stringify(props),
        ')',
      ].join('');
    }
    if (nameLabel &&  props) {
      return [
        '(',
        nameLabel,
        ' ',
        JSON.stringify(props),
        ')'
      ].join('');
    }
  }
}